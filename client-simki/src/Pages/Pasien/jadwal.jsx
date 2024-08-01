import React from 'react';
import '../../Style/Pasien/jadwal.css';

const Jadwal = () => {
  return (
    <div className='jadwal_container'>
      <div className="klinik_dipo">
        <div className="jadwal_table">
          <h2>Poli Umum</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th>SENIN</th>
                <th>SELASA</th>
                <th>RABU</th>
                <th>KAMIS</th>
                <th>JUMAT</th>
                <th>SABTU</th>
                <th>JAM</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows for the table here */}
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="jadwal_table">
          <h2>Poli Gigi</h2>
          <br />
          <table>
            <thead>
              <tr>
                <th>SENIN</th>
                <th>SELASA</th>
                <th>RABU</th>
                <th>KAMIS</th>
                <th>JUMAT</th>
                <th>SABTU</th>
                <th>JAM</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows for the table here */}
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="desc-jadwal">
        <p>
          
        </p>
      </div>
    </div>
  );
}

export default Jadwal;
