import { useState, useEffect } from "react";


{/**pour la simulation de mes transactions */}

const cryptos = ['BTC', 'ETH', 'LTC', 'SOL'];
const types = ['Achat', 'Vente', 'Retrait'];
const statuses = ['Terminé', 'En cours', 'Echoué'];

const generateRandomTransactions = (id) => {
  const type = types[Math.floor(Math.random() * types.length)];
  const crypto = cryptos[Math.floor(Math.random() * cryptos.length)];
  const montant = (Math.random() * 3).toFixed(2);
  const valeur = `$${(Math.random() * 100000 ).toFixed(0)}`;
  const date = new Date().toLocaleDateString('fr-FR');
  const status = Math.random() > 0.7 ? 'Terminé' : statuses[Math.floor(Math.random() * statuses.length)];
  
  return { id: `#${String(id).padStart(3, '0')}`, type, crypto, montant, valeur, date, status };
}

function Transaction() {

const [transactions, setTransactions] = useState(() => 
  Array.from({ length: 5 }, (_, i) => generateRandomTransactions(i + 1))
);
const [counter, setCounter] = useState(6);

useEffect(() => {
  const interval = setInterval(() => {
    setCounter(prev => {const newTx = generateRandomTransactions(prev); setTransactions(old=>[newTx, ...old.slice(0, 4)]); return prev + 1 })
  }, 5000);
return () => clearInterval(interval);
}, []);
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-titre">Transactions</h1>
        <p className="page-subtit">Historique des transactions</p>
      </div>

      <div className="panel">
        <div className="panel-titre">Historique</div>
        <table className="tx-table">
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
            {transactions.map((tx,i) => (
              <tr key={`${tx.id}-${i}`}>
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