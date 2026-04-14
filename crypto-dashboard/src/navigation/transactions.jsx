import { useState, useEffect } from "react";


function Transaction() {

const transactions=[
  {id: '#001', type : 'Achat', crypto: 'BTC', monatant: '0.5',valeur:'$25000', date: '2026-01-15', status: 'Terminé'},
  {id: '#002', type : 'Vente', crypto: 'ETH', monatant: '1.2', valeur: '$15000', date: '2026-02-10', status: 'En cours'},
  {id: '#003', type : 'Achat', crypto: 'LTC', monatant: '3.0', valeur: '$3000', date: '2026-03-05', status: 'Terminé'},
  {id: '#004', type : 'Achat', crypto: 'SOL', monatant: '0.2', valeur: '$25000', date: '2026-01-15', status: 'Echoué'},
]

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-titre">Transactions</h1>
        <p className="page-subtit">Historique des transactions</p>
      </div>

      <div className="panel">
        <div className="panel-titre">Historique</div>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Crypto</th>
              <th>Montant</th>
              <th>Valeur</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td className={tx.type  === 'Achat' ? 'tx-achat' : 'tx-vente'}>{tx.type}</td>
                <td>{tx.crypto}</td>
                <td>{tx.monatant}</td>
                <td>{tx.valeur}</td>
                <td>{tx.date}</td>
                <td>
                  <span className={`tx-status ${tx.status === 'Terminé' ? 'ok' : tx.status === 'En cours' ? 'patientez' : 'échoué'}`}>{tx.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;