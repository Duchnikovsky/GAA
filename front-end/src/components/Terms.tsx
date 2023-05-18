import TermsCSS from '../styles/terms.module.css'

export default function Terms(){

    return(
        <div className={TermsCSS.main}>
            <div className={TermsCSS.titleBox}>
                <span className={TermsCSS.title}>Terms and conditions</span>
            </div>
            <ol className={TermsCSS.list}>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Curabitur ac metus a est commodo blandit.</li>
                <li>Nunc laoreet libero id quam dapibus, ultricies mattis metus semper.</li>
                <li>Nullam eu erat fringilla, tempor turpis in, finibus purus.</li>
                <li>Cras tristique diam id pulvinar convallis.</li>
                <li>Quisque lobortis neque sed magna placerat, ac pellentesque velit ultrices.</li>
                <li>Etiam quis dolor interdum ante semper posuere vel a lacus.</li>
                <li>Nunc pellentesque nunc in nulla laoreet sagittis.</li>
                <li>Morbi ullamcorper erat posuere diam accumsan, at volutpat leo aliquet.</li>
                <li>Pellentesque suscipit ligula non vehicula convallis.</li>
                <li>Phasellus at ex vel magna blandit semper vel eget leo.</li>
                <li>Aenean commodo nibh vel nisl vulputate, et maximus erat efficitur.</li>
                <li>Aenean dictum magna ut sapien consectetur, et aliquam ante egestas.</li>
                <li>Pellentesque suscipit ligula non vehicula convallis.</li>
                <li>Phasellus at ex vel magna blandit semper vel eget leo.</li>
                <li>Aenean commodo nibh vel nisl vulputate, et maximus erat efficitur.</li>
                <li>Aenean dictum magna ut sapien consectetur, et aliquam ante egestas.</li>
            </ol>
        </div>
    )
}