import { useEffect } from 'react'
import { LinearGradient } from 'react-text-gradients'

const NotFound = () => {

  useEffect(() => {
    document.title = 'Página não encontrada';
  }, []);

  return (
    <>
      <div className="h-screen w-100" style={{ display: "flex", alignContent: "center"}}>
        <div style={{
          height: "fit-content", width: "fit-content", margin: "auto auto", alignSelf: "center",
          display: "flex", alignContent: "center", flex: "wrap", alignItems: "center", flexDirection: "column"
        }}>
          <p style={{
            height: "fit-content", fontSize: "8em", lineHeight: "1em"
          }}>
            <LinearGradient  className="text-900" gradient={['to top left', 'var(--secondary) ,var(--primary) ,var(--accent)']}>
              404
            </LinearGradient>
          </p>
          <p className="text-600" style={{
            color: "var(--text)", fontSize: "1.5em", lineHeight: "1em"
          }}>Página não encontrada
          </p>
          <a className='text-500 hover-pointer' href={'/'} style={{
            color: "var(--accent)", marginTop: "1em"
          }}>Voltar à página inicial</a>
        </div>
      </div>
    </>
  )
}

export default NotFound