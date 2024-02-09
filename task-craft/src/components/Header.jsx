import logo from '../assets/logo.png';
import add from '../assets/save-svgrepo-com.svg'
import save from '../assets/add-circle-svgrepo-com (1).svg'
import reset from '../assets/reset-svgrepo-com.svg'
import './Header.css';
const Header = () => {
    return (
        <>
            <div className='container'>
            <img className='logo' src={logo}/> 
            <h1 className='head'>Task Craft</h1>
            <div >
            <img className='icon-add' src={add}/>
            <img className='icon-reset'  src={save}/>
            </div>
            
            </div>
        </>
    )

}

export default Header