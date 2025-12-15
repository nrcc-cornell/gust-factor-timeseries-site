import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .row-vaisala': { backgroundColor: 'rgba(137, 255, 137, 0.4)' },
  '& .row-belfort': { backgroundColor: 'rgba(77, 205,255, 0.4)' }
}));

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

const formatValue = (value) => {
  return value === -99.0 ? 'M' : roundTo(value, 2);
};

export default function StationTable({ tableContents, rawOrSegment }) {
  const windDirections = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const columns = [
    {
      field: 'year',
      headerName: 'Year',
      sortComparator: (_,__,aParams,bParams) => aParams.id.localeCompare(bParams.id)
    },
    ...windDirections.map(wd => ({ field: wd, headerName: wd, valueFormatter: (value) => formatValue(value) }))
  ];

  const getRowClassName = (params) => {
    return `row-${params.row.anemometer.toLowerCase()}`;
  };

  if (tableContents === null) {
    return (<div></div>);
  }

  return (
    <StyledDataGrid
      rows={tableContents.map(row => ({ ...row[rawOrSegment], anemometer: row.anemometer, segmentVersion: row.segmentVersion })).toReversed()}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
        columns: {
          columnVisibilityModel: {
            NNE: false,
            ENE: false,
            ESE: false,
            SSE: false,
            NNW: false,
            ENW: false,
            ESW: false,
            SSW: false,
          },
        },
      }}
      pageSizeOptions={[10,20,30]}
      showToolbar
      getRowId={(row) => `${row.anemometer}-${row.year}`}
      getRowClassName={getRowClassName}
    />
  );
}