const Component = require('./Component');

let preset = 
`
<li class="action-field number-field", id="component{{id}}">
    <label for="{{name}}">{{name}}</label>
    <input type="number" name="{{name}}" id="component{{id}}input">
</li>
`;

class NumberComponent extends Component{
    constructor(){
        super(...arguments);
    }

    get dom(){
        return super.CreateFromString(preset);
    }

    get value(){
        return parseFloat(document.getElementById(`component${this.id}input`).value);
    }
}

module.exports = NumberComponent;