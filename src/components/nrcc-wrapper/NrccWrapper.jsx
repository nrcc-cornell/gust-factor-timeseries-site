import banner from './images/banner.png';
import acisLogo from './images/acis-transparent.png';
import noaaLogo from './images/noaa-transparent.png';
import rccLogo from './images/rcc-transparent.png';
import cornellLogo from './images/cornell-transparent.png';

export default function NrccWrapper({ children }) {
  return (
    <div className="bg-[#E0E5D1] min-h-screen">
          <div className="w-7xl mx-auto bg-white">
            
            <header>
              <a href='https://www.nrcc.cornell.edu/'>
                <img src={banner} alt='Northeast Regional Climate Center banner' />
              </a>
            </header>
            
            <main className='flex flex-col gap-5 mt-3 mb-6'>
              {children}
            </main>
            
            <footer className='h-[250px] w-full bg-[#d8e2e4] p-[2.34%] text-[11px]'>
              <div className="w-[24%] float-left pr-[3%]">
                <p className="mb-2.5">
                  <span>NRCC supports a three-tiered national climate services support program. The partners include: </span>
                  <a className="text-[#53682C]! underline!" href="https://www.stateclimate.org/" target="_blank">State Climate Offices</a>, 
                  <a className="text-[#53682C]! underline!" href="https://www.ncdc.noaa.gov/customer-support/partnerships/regional-climate-centers" target="_blank">Regional Climate Centers</a>
                  <span>, and  </span>
                  <a className="text-[#53682C]! underline!" href="https://www.ncei.noaa.gov/" target="_blank">the National Centers for Environmental Information</a>.
                </p>
                <p className='mb-0'><strong>Contact NRCC</strong></p>
                <p className="mb-2.5">2122 Snee Hall, Cornell University, Ithaca, NY 14853 </p>
                <p className="mb-2.5">Phone: 607-255-1751 | Fax: 607-255-2106</p>
                <p className="mb-2.5" id="copyright">© 2026 Northeast Regional Climate Center</p>
              </div>
              
              <div className="w-[16%] float-left pr-[1%]">
                <p className="mb-2.5"><a className="text-[#53682C]! underline!" href="/footer/mission.html">Mission Statement</a></p>
                <p className="mb-2.5"><a className="text-[#53682C]! underline!" href="/footer/personnel.html">Personnel</a></p>
                <p className="mb-2.5"><a className="text-[#53682C]! underline!" href="/footer/links.html">Links</a></p>
                <p className="mb-2.5"><a className="text-[#53682C]! underline!" href="/footer/contact.html">Contact</a></p>
                <p className="mb-2.5">website design: <a className="text-[#53682C]! underline!" href="http://knowledgetown.com" target="_blank">Knowledge Town</a></p>
              </div>
              
              <div className="w-[56%] float-left">
                <div className="float-left ml-[5%] mr-[3%]">
                  <a href="https://www.rcc-acis.org/" target="_blank">
                    <img src={acisLogo} alt="Powered by ACIS (Applied Climate Information System)" />
                  </a>
                </div>
            
                <div className="float-left ml-[5%] mr-[3%]">
                  <a href="https://www.ncei.noaa.gov/" target="_blank">
                    <img src={noaaLogo} alt="NOAA National Centers for Environmental Information" />
                  </a>
                </div>
            
                <div className="float-left ml-[5%] mr-[3%]">
                  <a href="https://www.ncei.noaa.gov/regional/regional-climate-centers" target="_blank">
                    <img src={rccLogo} alt="Regional Climate Centers" />
                  </a>
                </div>
            
                <div className="float-left ml-[5%] mr-[3%]">
                  <a href="https://www.cornell.edu/" target="_blank">
                    <img src={cornellLogo} alt="Cornell University" />
                  </a>
                </div>
              </div>			
            </footer>
          </div>
        </div>
  );
}