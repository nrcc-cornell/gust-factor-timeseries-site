import { useState, useRef } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import GustMap from './components/GustMap'
import StationTable from './components/StationTable';
import DataSwitch from './components/DataSwitch';

import fetchDataFromBucket from './utils/fetchDataFromBucket';

export default function App() {
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [rawOrSegment, setRawOrSegment] = useState('segment');
  
  const [station, setStation] = useState(null);
  const [tableContents, setTableContents] = useState(null);

  const tableDivRef = useRef(null);
  
  const scrollToElement = () => {
    if (tableDivRef.current) {
      tableDivRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleStationClick = (e) => {
    let timerId = null;
    let timerId2 = null;
    
    try {
      fetchDataFromBucket(`${e.features[0].properties.code}.json`)
      .then(data => setTableContents(data));
      
      timerId = setTimeout(() => {
        setTableIsOpen(true);
      }, 2000);
      
      timerId2 = setTimeout(() => {
        scrollToElement();
      }, 2100);

      setStation(e.features[0].properties);
    } catch {
      setTableContents(null);
      setTableIsOpen(false);
      return () => {
        clearTimeout(timerId);
        clearTimeout(timerId2);
      }
    }
  };

  const handleDataSwitchChange = (e) => {
    setRawOrSegment(e.target.checked ? 'raw': 'segment');
  };

  return (
    <div className="bg-[#E0E5D1] min-h-screen">
      <div className="w-7xl mx-auto bg-white">
        
        <Header />
        
        <main className='flex flex-col gap-5 mt-3 mb-6'>
          <div className='relative min-w-sm max-w-7xl w-4/5 mx-auto'>
            <a
              className='absolute right-0 top-0 border border-black text-black! px-2 py-1 hover:cursor-pointer hover:bg-gray-100'
              href='/JAMC_gust_factor_paper.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >About the Data</a>

            <h1 className='text-4xl!'>Annual Gust Factors</h1>

            <div className='px-8'>
              <p className='italic mt-5'>A gust factor is the ratio of peak wind gust to the 10-minute average wind speed. It is used to estimate how natural turbulence and wind peak gusts will dynamically affect structures like buildings, transmission towers, and bridges.</p>
              <p className='italic mt-5'>To select a station <b>click a dot</b> on the map below.</p>
              <p className='italic mt-5'>A table of annual gust factors will be returned for each 16-point compass wind direction for the period-of-record of 1-minute wind data (generally 2007-present).</p>
            </div>
          </div>

          <div className='min-w-sm max-w-7xl w-4/5 mx-auto overflow-hidden border-2 border-gray-400 rounded-xl shadow-lg'>
            <GustMap handleStationClick={handleStationClick}/>
          </div>
          
          <div ref={tableDivRef} className={tableIsOpen ? '' : ' hidden'}>

            <div className='min-w-sm max-w-7xl w-4/5 mx-auto mb-7'>
              <h6 className='text-lg! font-bold'>Annual Gust Factors</h6>

              <div className='px-8'>
                <p>Gust factors are computed based on 1-minute Automated Surface Observing System wind speed observations using the equation</p>

                <div className='mt-5'>
                  <math display="block">
                    <mrow>
                      <mi>GF</mi>
                      <mo>=</mo>
                      <msub>
                        <mi>W</mi>
                        <mn>gust</mn>
                      </msub>
                      <mo>/</mo>
                      <msub>
                        <mi>W</mi>
                        <mn>2</mn>
                      </msub>
                    </mrow>
                  </math>
                </div>

                <p className='mt-5'>where <math><msub><mi>W</mi><mn>2</mn></msub></math> is a 2-minute average wind speed and <math><msub><mi>W</mi><mn>gust</mn></msub></math> is either a 3-second (green rows) or 5-second (blue rows) gust value depending on anemometer type.</p>

                <p className='mt-10'>Missing gust factors <b>"M"</b> occur when the number of wind observations from a particular wind direction is too small for a reliable analysis.</p>

                <p className='mt-5'><b>Segment</b> gust factors are smoothed based on statistically detected breaks in the gust factor series.</p>
                <p><b>Raw</b> gust factors are unsmoothed annual average values based on the above equation.</p>
              </div>
            </div>

            {tableIsOpen ? (
              <div className='min-w-sm max-w-7xl w-4/5 mx-auto mb-7 '>
                {station && <h3 className='text-2xl! font-bold'>{station.name} ({station.code})</h3>}

                <div className='relative overflow-hidden border-2 border-gray-400 rounded-xl shadow-lg bg-white'>
                  <div className='absolute top-3.5 left-2 z-10'>
                    <DataSwitch
                      checked={rawOrSegment === 'raw'}
                      onChange={handleDataSwitchChange}
                      labelLeft='Segment'
                      labelRight='Raw'
                    />
                  </div>

                  <div className='-m-px'>
                    <StationTable tableContents={tableContents} rawOrSegment={rawOrSegment} station={station} />
                  </div>
                </div>
              </div>
            ) : (<></>)}
          </div>
        </main>
        
        <Footer />
        
      </div>
    </div>
  )
}