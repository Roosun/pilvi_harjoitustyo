import * as React from 'react';
import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Object[]>([]);
 
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('Käyttäjä kirjautunut sisään. isLoggedIn asetettu todeksi.');
  };

  React.useEffect(() => {
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='https://pilvipalvelut-matomo.rahtiapp.fi/js/container_z5BRB5Jn_dev_21d148776c3c543bc9c66354.js';
          if (s.parentNode) {
            s.parentNode.insertBefore(g, s);
          }
const fetchData = async () => {
      try {
          const api_params = {
            'module': 'API',
            'method': 'VisitsSummary.get',
            'idSite': '1', 
            'period': 'month',
            'date': 'last30',
            'format': 'json',
            'token_auth': '318af4316e721109a50ec64b8bacd1a4',
        };
        // const response = await axios.get('https://pilvipalvelut-matomo.rahtiapp.fi/index.php', { params: { api_params }})

    
        const response = await axios.get('https://dummyjson.com/products');
        if (response.status === 200) {
          const data = await response.data; 
          setProducts(data.products);
          
        }
      } catch (error) {
        console.error('Virhe tietojen haussa:', error)
      }
    };

      fetchData();
    }, []);


    const handleAddData = async () => {
      try {
        // lisää uusi tietue Firestoreen vain jos käyttäjä on kirjautunut sisään
        if (isLoggedIn) {
          for (const product of products) {
            const docRef = await addDoc(collection(firestore, 'Product'), product);
            console.log('Uusi JSON lisätty ID= ', docRef.id);
          }
        } else {
          console.log('Käyttäjä ei ole kirjautunut sisään. Dataa ei lisätty.');
        }
      } catch (error) {
        console.error('Virhe:', error);
      }
    };
    

  return (
    <>
      <h1>Pilvipalvelut web-kehityksessä harjoitystyö</h1>

      <LoginForm onLogin={handleLogin} />
      {isLoggedIn && (
        <div>
          <p>Kirjautuminen onnistui. Tervetuloa!</p>
          <h1>Tuotteet</h1>
          <table>
            <tbody>
              {products.map((product) => (
                <tr align="left" key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
      <p>
        <button onClick={handleAddData}>Lisää data Firestoreen</button>
      </p>
    </>
  );
}
export default App;