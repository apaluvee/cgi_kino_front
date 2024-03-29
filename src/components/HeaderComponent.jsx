import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div className='nav-options'>
                    <a href='/' className='navbar-brand'>
                        Movies
                    </a>
                    <a href='/movies-list' className='navbar-brand'>
                        Admin
                    </a>
                </div>
            </nav>
        </header>

    </div>
  )
}

export default HeaderComponent