import './ArticlePreview.css'

const ArticlePreview = ({id, title, body, date}) => {

    return(
        <div className='article-container'>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>{date}</p>
            <p>{id}</p>
        </div>
    )
}

export default ArticlePreview;