import React from 'react';
import { useNavigate } from 'react-router-dom';

const matchList = [
  ['Name', 'Score', 'Room', 'Traits Match'],
  ['Aisha', 92, '302', 'Clean, Quiet, Morning'],
  ['Nikita', 85, '205', 'Social, Night Owl'],
  ['Mira', 78, '108', 'Early Bird, Neat'],
];

export default function Spreadsheet() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>All Possible Matches</h2>
      <table border="1">
        <tbody>
          {matchList.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cidx) => (
                <td key={cidx} style={{ padding: '8px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/final')}>Register Final Choice</button>
    </div>
  );
}
