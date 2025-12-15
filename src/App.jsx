import { useState, useRef } from 'react';

import GustMap from './components/GustMap'
import StationTable from './components/StationTable';
import DataSwitch from './components/DataSwitch';

export default function App() {
  const [tableContents, setTableContents] = useState(null);
  const [tableIsOpen, setTableIsOpen] = useState(false);
  const [rawOrSegment, setRawOrSegment] = useState('raw');
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

    try {
      // fetch(`/station-data/${e.features[0].properties.code}.json`)
      fetch(`/station-data/fake.json`)
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
    setRawOrSegment(e.target.checked ? 'segment': 'raw');
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
                checked={rawOrSegment === 'segment'}
                onChange={handleDataSwitchChange}
                labelLeft='Raw'
                labelRight='Segment'
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