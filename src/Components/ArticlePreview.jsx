import './ArticlePreview.css'

const ArticlePreview = ({title, body, date}) => {

    return(
        <div className='article-container'>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>{date}</p>
        </div>
    )
}

export default ArticlePreview;