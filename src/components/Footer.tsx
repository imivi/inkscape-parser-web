export default function Footer() {

    const year = (new Date()).getUTCFullYear()
    
    return (
        <footer className="footer">© { year } Vittorio Minuzzo</footer>
    )
}