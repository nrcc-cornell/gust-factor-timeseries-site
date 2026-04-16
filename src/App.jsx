import { useState, useRef } from 'react';

import GustMap from './components/GustMap'
import StationTable from './components/StationTable';
import DataSwitch from './components/DataSwitch';

export default function App() {
  const [tableContents, setTableContents] = useState(null);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [rawOrSegment, setRawOrSegment] = useState('segment');
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

    console.log('Stubbed, but should fetch: ', e.features[0].properties.code);
    console.log(`${import.meta.env.BASE_URL}/station-data/${e.features[0].properties.code}.json`);

    try {
      fetch(`${import.meta.env.BASE_URL}/station-data/${e.features[0].properties.code}.json`)
      // fetch(new URL(`./station-data/${e.features[0].properties.code}.json`, import.meta.url).href)
        .then(response => response.json())
        .then(data => setTableContents(data));
      
      timerId = setTimeout(() => {
        setTableIsOpen(true);
      }, 2000);

      timerId2 = setTimeout(() => {
        scrollToElement();
      }, 2100);
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
    <div className='flex flex-col gap-5'>
      <h1>Gust Factor Timeseries</h1>
      <div className='min-w-sm max-w-7xl w-4/5 mx-auto overflow-hidden border-2 border-gray-400 rounded-xl shadow-lg'>
        <GustMap handleStationClick={handleStationClick}/>
      </div>
      <div ref={tableDivRef} className={'relative min-w-sm max-w-7xl w-4/5 mx-auto mb-7 overflow-hidden border-2 border-gray-400 rounded-xl shadow-lg bg-white' + (tableIsOpen ? '' : ' hidden')}>
        {tableIsOpen ? (
          <>
            <div className='absolute top-3.5 left-2 z-10'>
              <DataSwitch
                checked={rawOrSegment === 'raw'}
                onChange={handleDataSwitchChange}
                labelLeft='Segment'
                labelRight='Raw'
              />
            </div>

            <div className='-m-px'>
              <StationTable tableContents={tableContents} rawOrSegment={rawOrSegment} />
            </div>
          </>
        ) : (<></>)}
      </div>
    </div>
  )
}