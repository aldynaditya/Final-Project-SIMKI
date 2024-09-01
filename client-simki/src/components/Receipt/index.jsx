import React from 'react';
import { formatDateSlash } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/convertfunction';
import './faktur.css';

const Invoice = React.forwardRef(({ data }, ref) => {
    if (!data) {
        return null;
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    const discountPercentage = parseFloat(data.diskon) || 0;
    const priceAfterDiscount = data.total;
    const priceBeforeDiscount = priceAfterDiscount / (1 - (discountPercentage / 100));
    const discountAmount = (discountPercentage / 100) * priceBeforeDiscount;
    const konsultasiRow = {
        keterangan: `Konsultasi (${data.dokter})`,
        jumlah: 1,
        nilai: priceBeforeDiscount - data.totalOrder
    };

    return (
        <div className="invoice-container" ref={ref}>
            <div className="header">
                <div className="left-header">
                    <h2>KLINIK PRATAMA DIPONEGORO I</h2>
                    <p>Jln. Prof. H. Soedarto, S.H., Tembalang, Kota Semarang, Jawa Tengah<br />Telp. (082) 242780601</p>
                </div>
                <div className="right-header">
                    <div className="info-row-r">
                        <span className="info-label-r">No Invoice </span>
                        <span className="info-value-r">: {data.noInvoice}</span>
                    </div>
                    <div className="info-row-r">
                        <span className="info-label-r">No Pasien</span>
                        <span className="info-value-r">: {data.noEMR}</span>
                    </div>
                </div>
            </div>
            <div className="invoice-info">
                <div className="left">
                    <div className="info-row">
                        <span className="info-label">Nama</span>
                        <span className="info-value">: {data.namaPasien}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Alamat</span>
                        <span className="info-value">: {data.alamatPasien}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Tanggal Daftar</span>
                        <span className="info-value">: {formatDateTime(data.tanggaldaftar)}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Tanggal Pembayaran</span>
                        <span className="info-value">: {formatDateTime(data.tanggalpembayaran)}</span>
                    </div>
                </div>
                <div className="right">
                    <div className="info-row">
                        <span className="info-label">Poli</span>
                        <span className="info-value">: {data.poli}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Dokter</span>
                        <span className="info-value">: {data.dokter}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Jenis Pembayaran</span>
                        <span className="info-value">: {data.metodeBayar}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Keterangan</span>
                        <span className="info-value">: {data.keterangan}</span>
                    </div>
                </div>
            </div>
            <div className="invoice-details">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Keterangan</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formatDateSlash(data.tanggaldibuat)}</td>
                            <td>{konsultasiRow.keterangan}</td>
                            <td>{konsultasiRow.jumlah}</td>
                            <td>{formatCurrency(konsultasiRow.nilai)}</td>
                        </tr>
                        {data.ordersObat.map((order) => (
                            <tr key={order.uuid}>
                                <td>{formatDateSlash(data.tanggaldibuat)}</td>
                                <td>{order.namaobat}</td>
                                <td>{order.kuantitas}</td>
                                <td>{formatCurrency(order.total)}</td>
                            </tr>
                        ))}
                        {data.ordersProsedur.map((order) => (
                            <tr key={order.uuid}>
                                <td>{formatDateSlash(data.tanggaldibuat)}</td>
                                <td>{order.namaitem}</td>
                                <td>{order.kuantitas}</td>
                                <td>{formatCurrency(order.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="total">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Harga Sebelum Diskon</strong></td>
                            <td className="right-align"><strong>{formatCurrency(priceBeforeDiscount)}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Nominal Diskon</strong></td>
                            <td className="right-align"><strong>{formatCurrency(discountAmount)}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td className="right-align"><strong>{formatCurrency(data.total)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Invoice;
