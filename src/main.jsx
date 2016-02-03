import Comment from './comment';
import CommentList from './comment_list'
import CommentForm from './comment_form'

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

ReactDOM.render(
    <CommentBox url={'/api/comments'} pollInterval={2000} />,
    document.getElementById('content')
);