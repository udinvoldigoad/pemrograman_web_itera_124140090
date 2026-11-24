from datetime import date

from ..models import Mahasiswa, Matakuliah
import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.

    """
    existing_model = (
        dbsession.query(models.MyModel)
        .filter_by(name='one')
        .first()
    )
    if existing_model is None:
        model = models.MyModel(name='one', value=1)
        dbsession.add(model)

    # Tambahkan mahasiswa jika NIM belum terdaftar.
    data_mahasiswa = [
        {
            'nim': '124140090',
            'nama': 'Ridho Maulana Saputra',
            'jurusan': 'Teknik Informatika',
            'tanggal_lahir': date(2005, 9, 5),
            'alamat': 'Belwis',
        },
        {
            'nim': '127140090',
            'nama': 'Udin Berbahaya',
            'jurusan': 'Sistem Informasi',
            'tanggal_lahir': date(2008, 9, 5),
            'alamat': 'Jati Agung',
        },
    ]

    for data in data_mahasiswa:
        existing = (
            dbsession.query(Mahasiswa)
            .filter_by(nim=data['nim'])
            .first()
        )
        if existing is None:
            dbsession.add(Mahasiswa(**data))

    # Tambahkan minimal tiga matakuliah.
    data_matakuliah = [
        {
            'kode_mk': 'IF2110',
            'nama_mk': 'Pemrograman Web',
            'sks': 3,
            'semester': 5,
        },
        {
            'kode_mk': 'IF3140',
            'nama_mk': 'Basis Data',
            'sks': 3,
            'semester': 3,
        },
        {
            'kode_mk': 'IF2210',
            'nama_mk': 'Struktur Data',
            'sks': 4,
            'semester': 3,
        },
    ]

    for data in data_matakuliah:
        existing = (
            dbsession.query(Matakuliah)
            .filter_by(kode_mk=data['kode_mk'])
            .first()
        )
        if existing is None:
            dbsession.add(Matakuliah(**data))


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')
