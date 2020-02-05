const Component = require('./Component');

let preset = 
`
<li class="action-field bool-field" id="component{{id}}">
    <label for="{{name}}">{{name}}</label>
    <input type="checkbox" name="{{name}}" id="component{{id}}input">
</li>
`;

class BoolComponent extends Component{
    constructor(){
        super(...arguments);
    }

    get dom(){
        return super.CreateFromString(preset);
    }

    get value(){
        return document.getElementById(`component${this.id}input`).checked;
    }
}

module.exports = BoolComponent;