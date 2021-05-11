import { k } from 'kremling/src/k';
import './index-2';

let red, other;

const blue = false;

const styles = k`
  .test {
    text-align: right;
    background-color: ${'red' ? 'red' : 'blue'};
    
    .tester {
      background-color: blue;
    }
  }
`;

console.log(styles)

const DUO  = k`
  .test {
    text-align: right;
    background-color: ${'red'};
  }
`;