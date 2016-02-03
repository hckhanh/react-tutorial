import Comment from './comment';

export default class CommentList extends React.Component {

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