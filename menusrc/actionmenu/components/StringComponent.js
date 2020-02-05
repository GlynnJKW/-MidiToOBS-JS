const Component = require('./Component');

let preset = 
`
<li class="action-field string-field", id="component{{id}}">
    <label for="{{name}}">{{name}}</label>
    <input type="text" name="{{name}}" id="component{{id}}input">
</li>
`;

class StringComponent extends Component{
    constructor(){
        super(...arguments);
    }

    get dom(){
        return super.CreateFromString(preset);
    }

    get value(){
        return document.getElementById(`component${this.id}input`).value;
    }
}

module.exports = StringComponent;