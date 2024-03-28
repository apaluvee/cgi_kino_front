import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div>
                    <a href='http://localhost:3000' className='navbar-brand'>
                        TestingPage
                    </a>
                    <a href='http://localhost:3000/movies-list' className='navbar-brand'>
                        Movies
                    </a>
                </div>
            </nav>
        </header>

    </div>
  )
}

export default HeaderComponent