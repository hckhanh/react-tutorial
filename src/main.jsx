// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    getComments() {
        $.get(this.props.url)
        .done(data => {
            this.setState({data: data});
        });
    }

    componentDidMount() {
        this.getComments();
        // setInterval(this.getComments, this.props.pollInterval);
    }

    handleCommentSubmit(newComment) {
        this.state.data.push(newComment);
        this.setState(this.state.data);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comment Box</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }

}

class CommentForm extends React.Component {

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

class CommentList extends React.Component {

    render() {
        console.log(this);
        var commentNodes = this.props.data.map(comment => {
            return (
                <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }

}

class Comment extends React.Component {

    rawMarkup() {
        return {
            __html: marked(this.props.children.toString(), {sanitize: true})
        };
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }

}

ReactDOM.render(
    <CommentBox url={'/api/comments'} pollInterval={2000} />,
    document.getElementById('content')
);