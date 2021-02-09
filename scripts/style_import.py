#!/usr/bin/python3

import sys
import csv

from pymongo import MongoClient
from bson.objectid import ObjectId
from hashlib import md5

CLIENT_ID = '5fb42b127a466af2a747f0bc'

CATEGORIES_ID = {
    'Pulseira': '5febc0194fd538000738235a',
    'Infantil': '5febc0284fd538000738235b',
    'Brinco': '5febc0304fd538000738235c',
    'Folheado': '5febc0394fd538000738235d'
}

def main(argv):

    client = MongoClient('')

    database = client['universal']
    products = database['products']

    with open(argv[1], mode='r') as csv_file:

        csv_reader = csv.reader(csv_file,
            delimiter=',',
            quoting=csv.QUOTE_ALL)

        line_count = 0
        insertion_count = 0

        columns:list
        parsed:dict = {}

        for row in csv_reader:
            if len(row) == 0:
                continue

            line_count += 1

            if line_count == 1:
                columns = row
                print(f'Columns name: {", ".join(row)}')
                continue

            parsed_row = { x: y for x, y in zip(columns, row) }
            parsed.update(parsed_row)

            try:

                categories = [ category.split(' ')[0] for category in parsed_row['category_id'].split('##') ]
                categories = [ ObjectId(CATEGORIES_ID[category]) for category in categories if CATEGORIES_ID[category] ]

                new_product = {
                    'clientId': ObjectId(CLIENT_ID),
                    'slug': md5(parsed_row['products_name_br'].encode('utf-8')).hexdigest(),
                    'description': parsed_row['products_description_br'],
                    'categories': categories,
                    'sku': parsed_row['products_model'],
                    'price': parsed_row['products_price'],
                    'effectivePrice': parsed_row['products_price'],
                    'image': parsed_row['products_image_lrg'],
                    'pack': {
                        'weight': float(parsed_row['products_weight'] or '0'),
                        'height': float(parsed_row['pack_height'] or '0'),
                        'width': float(parsed_row['pack_width'] or '0'),
                    }
                }

                product = products.update_one({
                    'title': parsed_row['products_name_br']

                }, { '$set': new_product }, upsert=True)

                if product:
                    print(f'Product #{insertion_count} inserted')
                    insertion_count += 1

            except Exception:
                raise
                pass


if __name__ == '__main__':
    if len(sys.argv) == 2:
        main(sys.argv)

    else:
        print('{name} FILE.csv'.format(name=sys.argv[0]))