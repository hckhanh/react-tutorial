export default class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: ''
        }
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        $.post('/api/comments', {
            author: this.state.author,
            text: this.state.text
        })
        .done(res => {
            if (res.code != 200) return;

            this.props.onCommentSubmit({
                id: res.id,
                author: this.state.author,
                text: this.state.text
            });

            this.setState({
                author: '',
                text: ''
            });
        });
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
                <input type="submit" value="Post" />
            </form>
        );
    }

}