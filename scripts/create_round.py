import argparse
from pathlib import Path
from typing import Dict

import openpyxl

from .lorinspect_api import LorinspectAPI


def load_asset_rounds(path: Path) -> Dict[str, dict]:
    wb = openpyxl.load_workbook(path, data_only=True)
    sheet = wb.active
    headers = [c.value for c in next(sheet.iter_rows(max_row=1))]
    data = {}
    for row in sheet.iter_rows(min_row=2, values_only=True):
        rowd = {headers[i]: row[i] for i in range(len(headers))}
        data[str(rowd['asset_id'])] = rowd
    return data


def create_rounds(api: LorinspectAPI, round_xls: Path):
    asset_round_data = load_asset_rounds(round_xls)
    for asset_id, round_data in asset_round_data.items():
        name = str(round_data.get('asset_name') or '')
        if 'enc_pie' in name.lower():
            continue
        payload = {k: v for k, v in round_data.items() if k != 'asset_id'}
        payload['AssetId'] = asset_id
        api.create_round(payload)


def main():
    parser = argparse.ArgumentParser(description="Create rounds for assets")
    parser.add_argument('--round-excel', required=True, help='Excel file with rounds data')
    parser.add_argument('--api-url', required=True)
    parser.add_argument('--token', default='')
    args = parser.parse_args()

    api = LorinspectAPI(args.api_url, args.token)
    create_rounds(api, Path(args.round_excel))


if __name__ == '__main__':
    main()
