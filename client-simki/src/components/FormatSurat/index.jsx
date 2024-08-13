import React from 'react';
import '../../Style/components/FormatSurat.css';

const PrintSurat = React.forwardRef((props, ref) => {
    const { data } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
    
        const utcOffset = 7 * 60;
        const localDate = new Date(date.getTime() + utcOffset * 60 * 1000);

        const hours = String(localDate.getUTCHours()).padStart(2, '0');
        const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
    
        return `${hours}:${minutes}`;
    };

    return (
        <div ref={ref} className="print-surat">
            <header>
                <h1>Kop Surat</h1>
                <p>Alamat, Telepon, Email</p>
            </header>
            <main>
                <h2>Deskripsi Surat</h2>
                <p>{data.deskripsi}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>No. EMR</td>
                            <td>{data.noEMR}</td>
                        </tr>
                        <tr>
                            <td>Nama Pasien</td>
                            <td>{data.namaPasien}</td>
                        </tr>
                        <tr>
                            <td>Tanggal</td>
                            <td>{formatDate(data.tanggal)}</td>
                        </tr>
                        <tr>
                            <td>Nomor Faktur</td>
                            <td>{data.nomorFaktur}</td>
                        </tr>
                        <tr>
                            <td>Jam</td>
                            <td>{formatTime(data.jam)}</td>
                        </tr>
                        <tr>
                            <td>Poli</td>
                            <td>{data.poli}</td>
                        </tr>
                        <tr>
                            <td>Pemeriksa</td>
                            <td>{data.pemeriksa}</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Data Tabel</h3>
                <ul>
                    {data.orders.map((order) => (
                        <li key={order.id}>
                            <p><strong>Tanggal:</strong> {formatDate(order.tanggal)}</p>
                            <p><strong>Jenis Surat:</strong> {order.jenis_surat}</p>
                            <p><strong>Tujuan:</strong> {order.tujuan}</p>
                            <p><strong>Versi Surat:</strong> {order.versi_surat}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            </main>
            <footer>
                <p>Tanda Tangan</p>
                <p>_______________________</p>
            </footer>
        </div>
    );
});

export default PrintSurat;
