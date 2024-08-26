import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchedules } from '../../redux/patient/schedule/actions';
import '../../Style/Pasien/jadwal.css';

const Jadwal = () => {
  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector(state => state.schedule);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  const dayOrder = {
    'Senin': 1,
    'Selasa': 2,
    'Rabu': 3,
    'Kamis': 4,
    'Jumat': 5,
    'Sabtu': 6,
    'Minggu': 7
  };

  const renderTableRows = (poliName) => {
    return schedules
      .filter(schedule => schedule.poli === poliName && schedule.status !== 'tidak ada')
      .sort((a, b) => {
        if (dayOrder[a.hari] !== dayOrder[b.hari]) {
          return dayOrder[a.hari] - dayOrder[b.hari];
        }
        return a.jam.localeCompare(b.jam);
      })
      .map((schedule, index) => (
        <tr key={index}>
          <td className='td-jadwal'>{schedule.dokter}</td>
          <td className='td-jadwal'>{schedule.hari}</td>
          <td className='td-jadwal'>{schedule.jam}</td>
        </tr>
      ));
  };

  return (
    <div className='jadwal_container'>
      <div className="klinik_dipo_jadwal">
        <h1 className= "Header-Jadwal" >JADWAL PRAKTIK DOKTER</h1>
        <div className="jadwal_table">
          <h2 className="header-umum">Poli Umum</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th className='th-jadwal'>Dokter</th>
                <th className='th-jadwal'>Hari</th>
                <th className='th-jadwal'>Jam</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows('Umum')}
            </tbody>
          </table>
        </div>
        <div className="jadwal_table">
          <h2 className="header-gigi ">Poli Gigi</h2>
          <br />
          <table>
            <thead>
              <tr >
                <th className='th-jadwal'>Dokter</th>
                <th className='th-jadwal'>Hari</th>
                <th className='th-jadwal'>Jam</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows('Gigi')}
            </tbody>
          </table>
        </div>
      </div>
      <div className="desc-jadwal">
        <p>
          {/* keterangan tambahan */}
        </p>
      </div>
    </div>
  );
}

export default Jadwal;
