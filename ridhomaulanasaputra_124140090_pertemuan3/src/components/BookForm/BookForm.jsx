import { useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

function BookForm({ onSubmit, initialData, onCancel }) {
  const isEdit = Boolean(initialData);

  // Controlled form: nilai input disimpan di state
  const [form, setForm] = useState(
    initialData
      ? { title: initialData.title, author: initialData.author, status: initialData.status }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Hapus pesan error field ini begitu pengguna mulai mengetik lagi
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Validasi kolom wajib isi
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Judul buku wajib diisi';
    if (!form.author.trim()) newErrors.author = 'Nama penulis wajib diisi';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    // Setelah tambah buku, kosongkan form (mode edit ditutup oleh parent)
    if (!isEdit) setForm(EMPTY_FORM);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
          placeholder="Judul buku"
        />
        {errors.title && <span className="error-text" role="alert">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
          placeholder="Nama penulis"
        />
        {errors.author && <span className="error-text" role="alert">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="milik">Milik</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEdit && (
          <button type="button" className="btn" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onCancel: PropTypes.func,
};

BookForm.defaultProps = {
  initialData: null,
  onCancel: () => {},
};

export default BookForm;
