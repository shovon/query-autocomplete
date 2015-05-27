import QueryInput from './QueryInput';
import $ from 'jquery';

const input = new QueryInput();

$('#container').append(input.render().$el[0]);
