import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllEpisode } from '../../redux/doctor/indexDetailEpisode/actions';
import { formatDateSlash } from '../../utils/dateUtils';
import '../../Style/components/RiwayatEps.css';

const RiwayatEpisode = ({ noEMR }) => {
    const dispatch = useDispatch();
    const { data: dataEpisode, loading: loadingEpisode, error: errorEpisode } = useSelector(state => state.getallEpisode);

    useEffect(() => {
        if (noEMR) {
            dispatch(fetchAllEpisode(noEMR));
        }
    }, [dispatch, noEMR]);

    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);

    const LihatDetailEps = (id) => {
        let path;
        if (role === 'dokter') {
            path = `/dokter/detail-episode/${id}`;
        } else if (role === 'resepsionis') {
            path = `/resepsionis/detail-episode/${id}`;
        } else if (role === 'perawat') {
            path = `/perawat/detail-episode/${id}`;
        }
        navigate(path);
    };

    if (loadingEpisode) return <div>Loading...</div>;
    if (errorEpisode) return <div>Error: {errorEpisode}</div>;

    return (
        <div className='tabel-eps-rsp'>
            <h2 className='h2-riwayat-eps-rsp'>Riwayat Episode</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Pemeriksa</th>
                        <th>SOAP</th>
                    </tr>
                </thead>
                <tbody>
                    {dataEpisode.map((row) => (
                        <tr key={row.id}>
                            <td className='kolom-tgl-eps-rsp'>
                                <p className='tgl-eps-rsp'>{formatDateSlash(row.tanggal)}</p>
                                <button className='lihat-emr-rsp' onClick={() => LihatDetailEps(row.id)}>Lihat</button>
                            </td>
                            <td className='kolom-dr-eps-rsp'>
                                <p className='dr-eps-rsp'>{row.pemeriksa}</p>
                                <p className='poli-eps-rsp'>{row.department}</p>
                            </td>
                            <td className='kolom-soap-eps-rsp'>
                                <ul 
                                    className='soap-list'>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>S :{row.subjective}</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>O :{row.objective}</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>A :{row.assessment}</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>P :{row.plan}</span> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='soap-entry'>
                                            <span>Tindakan :{row.tindakan}</span> 
                                        </div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RiwayatEpisode;
