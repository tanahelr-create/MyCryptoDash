import { PieChart, Pie, Cell,Tooltip, ResponsiveContainer } from "recharts"; 


const portfolioData = [
  { crypto: "BTC", quantite:'0.5', value:34028 ,valeur: '$34,023', change:'+2.4%', positif:true },
  { crypto: "ETH", quantite:'2', value:20000, valeur: '$20,000', change:'+1.2%', positif:true },
  { crypto: "ADA", quantite:'10', value:10000, valeur: '$10,000', change:'-0.5%', positif:false },
  { crypto: "SOL", quantite:'5', value:5000, valeur: '$5,000', change:'+3.1%', positif:true },
];

const COLORS = ["#00ff9f", "#00e5ff", "#7b2fff", "#ffaa00"];

function Wallet() {
  const total='$45,800'
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-titre">Portefeuille</h1>
        <p className="page-subtit">Valeur total: {total}</p>
      </div>
      <div className="mid-row">
        <div className="panel">
          <div className="panel-titre">Répartition du portefeuille</div>
          <table className="tx-table">
            <thead>
              <tr>
                <th>Crypto</th>
                <th>Quantité</th>
                <th>Valeur</th>
                <th>24h</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.map((item, i) => (
                <tr key={i}>
                  <td>{item.crypto}</td>
                  <td>{item.quantite}</td>
                  <td>{item.valeur}</td>
                  <td className={item.positif ? 'tx-achat' : 'tx-vente'}>{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div className="panel-titre">Répartition du portefeuille</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData}
                dataKey="value"
                nameKey="crypto"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                fill="#8884d8"
              >
                {portfolioData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
                </div>
        </div>
    </div>
  );
}

export default Wallet;