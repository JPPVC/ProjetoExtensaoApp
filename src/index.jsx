import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { title, titleCaixa, caixa, pCaixa, padding, caixaContainer, link } from './layout.css'


//TODO trabalhando aq 
const Link = ( {url} ) => {


    const urlIsValid = ( url ) => {
        try {
            new URL( url)
            return true 
        } catch( e ) {
            return false 
        }
        
    }

   //TODO TRABALHANDO AQQQQQ
    
    const textSubmit = ( url ) => {
         
        if ( urlIsValid( url) ) {
            
        }
    }

    document.addEventListener( "DOMContentLoaded", () => {

        const link = document.getElementById( 'linkInput' )
        link.addEventListener( 'keypress',  e => {
            if ( e.key === 'Enter') {

                const link = document.getElementById( 'linkInput' )
                textSubmit( link.value )
            }
        })
    })
   


    return (
        <div>
            <p>Link Para uma imagem</p>
            <input id="linkInput" className={link} type="text"  />
        </div> 
    )
}
//TODO trabalhando aq 
const Galeria =  () => {

    const fullUrl = window.location.href

    const fetchFotos = async () => {
        const response = await fetch( `${fullUrl}galeriaNames` )
        const fileNames = await response.json()
        
        const galeria = document.getElementById( 'galeria' )

        console.log( fileNames )

        if ( fileNames.fotos !== undefined ) {
            for ( let i=0; i<fileNames.fotos.length; i++) {

            
                const img = document.createElement( 'img' )
                
                const response = await fetch(`${fullUrl}${fileNames.fotos[i]}`)
                const imageBlob = await response.blob()
                const objecturl = URL.createObjectURL( imageBlob )
                img.src = objecturl

                console.log( `fazendoupload da imagem ${fullUrl}${fileNames.fotos[i]}`)
                galeria.appendChild( img )
            }
        }

       //  const response = await fetch(fullUrl+'galeria')
       // const imageBlob = await response.blob()
       // const objectUrl = URL.createObjectURL( imageBlob ) //Criar URL temporario para imagem recebida 
       //  document.getElementById( 'imagem' ).src = objectUrl
    }

    const fotos = fetchFotos()

    return (
        <div id="galeria">
            <img id="imagem"></img>
        </div>
    )
}

const UploadImg = () => {

    const [ file, setFile ] = useState( null )
    const fullUrl = window.location.href

   // const url = useLocation().pathname

    const submit = async e => {
        e.preventDefault()

    
        if( !file ) {
            console.log( 'arquivo nn foi selecionado ')
            alert('Selecione um arquivo antes de mandar')
            return
        }


        console.log( 'aqui ')
        const formData = new FormData() //ler sobre isso 
        formData.append( 'foto', file)

        try{

            console.log( fullUrl + 'uploadimg')
            const response = await fetch( fullUrl+'uploadimg', {
                method:'POST',
                body:formData
            })

            const result = await response.json()
            if ( !result.error ) {
                alert( 'imagem submetida!')
            }
            //alert( 'Imagen submetida' )

        } catch( e ) { 
            console.log( e )
            alert( 'incapaz de mandar imagem para servidord')
        }

        console.log( 'saindo ')
    }

    const fileChanged = async e => { 

        console.log ( 'file changed ')
        if( e.target.files && e.target.files[0] ) {
            setFile( e.target.files[0] )
        }

    }

    return (
        
        <form onSubmit={submit} encType="multipart/form-data" >
           <input name="foto1" type="file" onChange={fileChanged} accept="image/*" />
           <button type="submit" >clique aq</button>
        </form>
    )
}

const Caixa = ( {titulo, children } ) => {
    return (
        <div className={caixa}>
            <h1 className={titleCaixa}>{titulo}<br/></h1>
            <div className={pCaixa}> {children} </div>
        </div>
    )
}

const CaixaContainer = ( {children} ) => {
    return (
        <div className={caixaContainer}>
            {children}
        </div>
    )
}

const Home = () => {
   
    return ( 
        <div className={padding}>
            <h1 className={title}>Projeto De Extensao</h1>
            <CaixaContainer>
                <Caixa titulo="Sobre nós...">O que seria esse projeto de extensão sobre</Caixa>
                <Caixa titulo="Faça o upload de uma imagem...">
                    <UploadImg/>
                    <Link/>
                </Caixa>
                <Caixa titulo="Galeria"><Galeria/></Caixa>
            </CaixaContainer>
        </div>
    )
}

const NotFound = () => {

    return (
        <div>
                <p>Not found</p>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            
        </div>
    )
}


const root = createRoot( document.getElementById( 'root' ))



root.render( <App/> )
