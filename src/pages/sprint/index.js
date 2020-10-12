import './index.scss';
import App from './components/App';

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

const app = new App();

app.init();
