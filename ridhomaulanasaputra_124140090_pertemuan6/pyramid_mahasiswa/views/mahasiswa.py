from datetime import date

from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Mahasiswa


def validasi_data(data, tambah=False):
    if not isinstance(data, dict):
        raise ValueError('Body harus berupa objek JSON.')

    wajib = ('nim', 'nama', 'jurusan')
    hasil = {}

    for field in wajib:
        if tambah or field in data:
            nilai = data.get(field)
            if not isinstance(nilai, str) or not nilai.strip():
                raise ValueError(f'Field {field} wajib berupa teks tidak kosong.')
            hasil[field] = nilai.strip()

    if 'alamat' in data:
        if data['alamat'] is not None and not isinstance(data['alamat'], str):
            raise ValueError('Alamat harus berupa teks.')
        hasil['alamat'] = data['alamat']

    if 'tanggal_lahir' in data:
        nilai = data['tanggal_lahir']
        if nilai is None or nilai == '':
            hasil['tanggal_lahir'] = None
        else:
            try:
                hasil['tanggal_lahir'] = date.fromisoformat(nilai)
            except (ValueError, TypeError):
                raise ValueError('Tanggal lahir harus berformat YYYY-MM-DD.')

    return hasil


def cari_mahasiswa(request):
    try:
        mahasiswa_id = int(request.matchdict['id'])
    except ValueError:
        return None

    return (
        request.dbsession.query(Mahasiswa)
        .filter_by(id=mahasiswa_id)
        .first()
    )


@view_config(
    route_name='mahasiswa_list',
    request_method='GET',
    renderer='json',
)
def mahasiswa_list(request):
    daftar = (
        request.dbsession.query(Mahasiswa)
        .order_by(Mahasiswa.id)
        .all()
    )
    return {'mahasiswas': [item.to_dict() for item in daftar]}


@view_config(
    route_name='mahasiswa_detail',
    request_method='GET',
    renderer='json',
)
def mahasiswa_detail(request):
    mahasiswa = cari_mahasiswa(request)
    if mahasiswa is None:
        return HTTPNotFound(
            json_body={'error': 'Mahasiswa tidak ditemukan.'}
        )

    return {'mahasiswa': mahasiswa.to_dict()}


@view_config(
    route_name='mahasiswa_add',
    request_method='POST',
    renderer='json',
)
def mahasiswa_add(request):
    try:
        data = validasi_data(request.json_body, tambah=True)
    except ValueError as error:
        return HTTPBadRequest(json_body={'error': str(error)})

    try:
        with request.dbsession.begin_nested():
            mahasiswa = Mahasiswa(**data)
            request.dbsession.add(mahasiswa)
            request.dbsession.flush()
    except IntegrityError:
        return HTTPBadRequest(
            json_body={'error': 'NIM sudah digunakan.'}
        )

    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(
    route_name='mahasiswa_update',
    request_method='PUT',
    renderer='json',
)
def mahasiswa_update(request):
    mahasiswa = cari_mahasiswa(request)
    if mahasiswa is None:
        return HTTPNotFound(
            json_body={'error': 'Mahasiswa tidak ditemukan.'}
        )

    try:
        data = validasi_data(request.json_body)
    except ValueError as error:
        return HTTPBadRequest(json_body={'error': str(error)})

    try:
        with request.dbsession.begin_nested():
            for field, nilai in data.items():
                setattr(mahasiswa, field, nilai)
            request.dbsession.flush()
    except IntegrityError:
        return HTTPBadRequest(
            json_body={'error': 'NIM sudah digunakan.'}
        )

    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(
    route_name='mahasiswa_delete',
    request_method='DELETE',
    renderer='json',
)
def mahasiswa_delete(request):
    mahasiswa = cari_mahasiswa(request)
    if mahasiswa is None:
        return HTTPNotFound(
            json_body={'error': 'Mahasiswa tidak ditemukan.'}
        )

    request.dbsession.delete(mahasiswa)
    return {'success': True, 'message': 'Mahasiswa berhasil dihapus.'}