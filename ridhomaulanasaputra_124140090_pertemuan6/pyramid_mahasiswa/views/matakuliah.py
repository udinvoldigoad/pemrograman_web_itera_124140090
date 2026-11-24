from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError

from ..models import Matakuliah


def validasi_data(data, tambah=False):
    if not isinstance(data, dict):
        raise ValueError('Body harus berupa objek JSON.')

    hasil = {}

    for field in ('kode_mk', 'nama_mk'):
        if tambah or field in data:
            nilai = data.get(field)
            if not isinstance(nilai, str) or not nilai.strip():
                raise ValueError(
                    f'Field {field} wajib berupa teks tidak kosong.'
                )
            hasil[field] = nilai.strip()

    for field in ('sks', 'semester'):
        if tambah or field in data:
            nilai = data.get(field)
            if type(nilai) is not int or nilai <= 0:
                raise ValueError(
                    f'Field {field} wajib berupa integer lebih dari 0.'
                )
            hasil[field] = nilai

    return hasil


def cari_matakuliah(request):
    try:
        matakuliah_id = int(request.matchdict['id'])
    except ValueError:
        return None

    return (
        request.dbsession.query(Matakuliah)
        .filter_by(id=matakuliah_id)
        .first()
    )


@view_config(
    route_name='matakuliah_list',
    request_method='GET',
    renderer='json',
)
def matakuliah_list(request):
    daftar = (
        request.dbsession.query(Matakuliah)
        .order_by(Matakuliah.id)
        .all()
    )
    return {'matakuliahs': [item.to_dict() for item in daftar]}


@view_config(
    route_name='matakuliah_detail',
    request_method='GET',
    renderer='json',
)
def matakuliah_detail(request):
    matakuliah = cari_matakuliah(request)
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': 'Matakuliah tidak ditemukan.'}
        )

    return {'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_add',
    request_method='POST',
    renderer='json',
)
def matakuliah_add(request):
    try:
        data = validasi_data(request.json_body, tambah=True)
    except ValueError as error:
        return HTTPBadRequest(json_body={'error': str(error)})

    try:
        with request.dbsession.begin_nested():
            matakuliah = Matakuliah(**data)
            request.dbsession.add(matakuliah)
            request.dbsession.flush()
    except IntegrityError:
        return HTTPBadRequest(
            json_body={'error': 'Kode matakuliah sudah digunakan.'}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_update',
    request_method='PUT',
    renderer='json',
)
def matakuliah_update(request):
    matakuliah = cari_matakuliah(request)
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': 'Matakuliah tidak ditemukan.'}
        )

    try:
        data = validasi_data(request.json_body)
    except ValueError as error:
        return HTTPBadRequest(json_body={'error': str(error)})

    try:
        with request.dbsession.begin_nested():
            for field, nilai in data.items():
                setattr(matakuliah, field, nilai)
            request.dbsession.flush()
    except IntegrityError:
        return HTTPBadRequest(
            json_body={'error': 'Kode matakuliah sudah digunakan.'}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


@view_config(
    route_name='matakuliah_delete',
    request_method='DELETE',
    renderer='json',
)
def matakuliah_delete(request):
    matakuliah = cari_matakuliah(request)
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': 'Matakuliah tidak ditemukan.'}
        )

    request.dbsession.delete(matakuliah)
    return {
        'success': True,
        'message': 'Matakuliah berhasil dihapus.',
    }