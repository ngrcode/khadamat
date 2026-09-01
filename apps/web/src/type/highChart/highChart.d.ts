declare module 'highcharts/highcharts-3d' {
  import Highcharts from 'highcharts';
  const Highcharts3D: (H: typeof Highcharts) => typeof Highcharts;
  export default Highcharts3D;
}
