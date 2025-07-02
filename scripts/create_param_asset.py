import argparse
from collections import defaultdict
from pathlib import Path
from typing import Dict, List

import openpyxl

from .lorinspect_api import LorinspectAPI


def parse_sheet(sheet) -> List[dict]:
    headers = [cell.value for cell in next(sheet.iter_rows(min_row=1, max_row=1))]
    data = []
    for row in sheet.iter_rows(min_row=2, values_only=True):
        if all(value is None for value in row):
            continue
        data.append({header: row[i] for i, header in enumerate(headers)})
    return data


def load_main_excel(path: Path):
    wb = openpyxl.load_workbook(path, data_only=True)
    assets = {row['id_asset']: row for row in parse_sheet(wb['Assets'])}
    params = defaultdict(list)
    for row in parse_sheet(wb['Params']):
        params[row['id_asset']].append(row)
    options = defaultdict(list)
    for row in parse_sheet(wb['Options']):
        options[row['id_param']].append(row)
    return assets, params, options


def load_mapping(path: Path) -> Dict[str, List[str]]:
    wb = openpyxl.load_workbook(path, data_only=True)
    sheet = wb.active
    mapping = defaultdict(list)
    headers = [c.value for c in next(sheet.iter_rows(max_row=1))]
    for row in sheet.iter_rows(min_row=2, values_only=True):
        rowd = {headers[i]: row[i] for i in range(len(headers))}
        checklist = str(rowd['id_checklist'])
        asset = str(rowd['id_asset'])
        mapping[checklist].append(asset)
    return mapping


def gather_support_params(assets, params) -> List[dict]:
    support_params = []
    for asset_id, asset in assets.items():
        name = str(asset.get('name') or '')
        if 'enc_pie' in name.lower():
            support_params.extend(params.get(asset_id, []))
    return support_params


def create_all(api: LorinspectAPI, assets_xls: Path, mapping_xls: Path):
    assets, params, options = load_main_excel(assets_xls)
    mapping = load_mapping(mapping_xls)

    support_params = gather_support_params(assets, params)

    # create parameters first
    param_api_map = {}
    for asset_id, param_list in params.items():
        for param in param_list:
            param_data = {k: v for k, v in param.items() if k not in {'id_param', 'id_asset'}}
            created = api.create_param(param_data)
            param_api_map[param['id_param']] = created.get('id') or created.get('Id')
            for opt in options.get(param['id_param'], []):
                opt_data = {k: v for k, v in opt.items() if k != 'id_param'}
                api.create_option(param_api_map[param['id_param']], opt_data)

    # create assets grouped by checklist
    for checklist_id, asset_ids in mapping.items():
        parent_api_id = None
        for idx, asset_id in enumerate(asset_ids):
            asset = assets.get(asset_id)
            if not asset:
                continue
            payload = {k: v for k, v in asset.items() if k != 'id_asset'}
            payload['ChecklistId'] = checklist_id
            param_list = params.get(asset_id, []) + support_params
            payload['ParameterIds'] = [param_api_map[p['id_param']] for p in param_list
                                       if p['id_param'] in param_api_map]
            if idx > 0 and parent_api_id:
                payload['ParentAssetId'] = parent_api_id
            created = api.create_asset(payload)
            if idx == 0:
                parent_api_id = created.get('id') or created.get('Id')


def main():
    parser = argparse.ArgumentParser(description="Create parameters and assets")
    parser.add_argument('--main-excel', required=True, help='Excel file with Assets, Params, Options')
    parser.add_argument('--mapping-excel', required=True, help='Excel file mapping checklist/assets')
    parser.add_argument('--api-url', required=True)
    parser.add_argument('--token', default='')
    args = parser.parse_args()

    api = LorinspectAPI(args.api_url, args.token)
    create_all(api, Path(args.main_excel), Path(args.mapping_excel))


if __name__ == '__main__':
    main()
