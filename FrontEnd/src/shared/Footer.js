import "../styleShared/Footer.css"
const Footer =()=>{
    return(
        <footer>
                <div className="footer_main">
                    <div className="tag">
                        <h1>Contact</h1>
                        <a href="/"><i className="fa-solid fa-house"></i>123/Colombo/Sri Lanka</a>
                        <a href="/"><i className="fa-solid fa-phone"></i>+94 12 345 6789</a>
                        <a href="/"><i className="fa-solid fa-envelope"></i>contact@ilearning.com</a>
                    </div>
          
                    <div className="tag">
                        <h1>Get Help</h1>
                        <a href="/" className="center">FAQ</a>
                        <a href="/" className="center">Returns</a>
                        <a href="/" className="center">Payment Options</a>
                    </div>
          
                    <div className="tag">
                        <h1>Follow us</h1>
                        <div className="social_link">
                            <a href="https://web.facebook.com/" target="blank"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://twitter.com/" target="blank"><i className="fa-brands fa-twitter"></i></a>
                            <a href="https://www.instagram.com/" target="blank"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/" target="blank"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;