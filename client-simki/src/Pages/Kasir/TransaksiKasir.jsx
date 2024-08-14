import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/Kasir/TransaksiKasir.css';
import SearchBar from '../../components/SearchBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DetailFaktur from './DetailFaktur';
import { fetchTransaction } from '../../redux/kasir/index/actions';

const TransaksiKasir = () => {
    const dispatch = useDispatch();
    const { data: rows, loading, error } = useSelector(state => state.transaction);


    const [isDetailFakturVisible, setIsDetailFakturVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchTransaction());
            } catch (error) {
                console.error("Error fetching transaction data:", error);
                alert("Gagal mengambil data transaksi. Silakan coba lagi nanti.");
            }
        };
    
        fetchData();
    }, [dispatch]);
    

    const handleDetailFakturOpen = (index) => {
        if (rows && rows.length > 0) {
            const selectedRow = rows[index];
            if (selectedRow && selectedRow.emrpasien) {
                setIsDetailFakturVisible(true);
            } else {
                console.error("Data 'emrpasien' tidak tersedia.");
                alert("Data EMR Pasien tidak tersedia.");
            }
        }
    };
    

    const handleDetailFakturClose = () => {
        setIsDetailFakturVisible(false);
    };

    const CetakTransaksi = (index) => {
        const element = document.getElementById(`row-${index}`);
        if (!element) return; 
        
        const cloneTable = document.createElement('table');
        const cloneThead = document.querySelector('.tabel_transaksi thead').cloneNode(true);
        const cloneRow = element.cloneNode(true);

        cloneThead.querySelectorAll('th')[9].remove();
        cloneRow.querySelectorAll('td')[9].remove();

        cloneTable.appendChild(cloneThead);
        cloneTable.appendChild(cloneRow);

        cloneTable.style.fontSize = '12px';
        cloneTable.style.borderCollapse = 'collapse';
        cloneTable.querySelectorAll('th, td').forEach(cell => {
            cell.style.padding = '4px';
            cell.style.border = '1px solid #ddd';
        });

        document.body.appendChild(cloneTable);

        html2canvas(cloneTable).then(canvas => {
            document.body.removeChild(cloneTable);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', [215, 40]);
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("struk_transaksi.pdf");
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="transaksi-wrapper">
            <div className="navbar-header-transaksi"></div>
            <div className="transaksi-container">
                <div className="content-wrapper-transaksi">
                    <div className="header-transaksi">
                        <h1 className="text_transaksi">Transaksi</h1>
                        <SearchBar />
                    </div>
                    <div className="tabel_transaksi_wrapper">
                        <div className="tabel_transaksi">
                            <table>
                                <thead>
                                    <tr>
                                        <th>No. Faktur</th>
                                        <th>Tanggal</th>
                                        <th>No. EMR</th>
                                        <th>Nama Pasien</th>
                                        <th>Penjamin</th>
                                        <th>Metode Bayar</th>
                                        <th>Total Jasa</th>
                                        <th>Total</th>
                                        <th>Petugas</th>
                                        <th>Status</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows && rows.length > 0 ? (
                                        rows.map((row, index) => (
                                            <tr key={index} id={`row-${index}`}>
                                                <td>{row.noInvoice || 'N/A'}</td>
                                                <td>{row.tanggal || 'N/A'}</td>
                                                <td>{row.EMRPasien || 'Data tidak tersedia'}</td>
                                                <td>{row.namaPasien || 'N/A'}</td>
                                                <td>{row.penjamin || 'N/A'}</td>
                                                <td>{row.metodeBayar || 'N/A'}</td>
                                                <td>{row.totalJasa || 'N/A'}</td>
                                                <td>{row.total || 'N/A'}</td>
                                                <td>{row.petugas || 'N/A'}</td>
                                                <td>{row.status || 'N/A'}</td>
                                                <td className="detail-faktur-cell">
                                                    <button className="detail-faktur" onClick={() => handleDetailFakturOpen(index)}>Detail</button>
                                                    <button className="cetak-transaksi" onClick={() => CetakTransaksi(index)}>Cetak</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="11">Tidak ada data transaksi</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isDetailFakturVisible && <DetailFaktur onClose={handleDetailFakturClose} />}
        </div>
    );
};

export default TransaksiKasir;
