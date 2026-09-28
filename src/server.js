const express = require('express')
const path = require('node:path')
const app = express()
const port = 3000

const fs = require( 'node:fs' )

const multer = require( 'multer' )

var fileCounter = 0 
const publicPath = path.resolve( './dist' )
const uploadPath = path.resolve( './uploads' )

const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const now = new Date()

        let name = `arquivo${fileCounter}${now}`
        name = name.replaceAll( / /g, '_')

        cb(null , name ) 
        fileCounter++
    }
})

const filter = (req, file, cb) => {
    const allowedType = [ 'image/jpeg', 'image/png', 'images/*']

    if( allowedType.includes( file.mimetype) ) {
        cb( null, true )
    } else  [
        cb( new Error( ` Apenas arquivos de imagem sao permitidos ... ${ file.mimetype }`), false )
    ]
}

const upload = multer( {storage: storage, fileFilter:filter } )


app.use( express.static( publicPath) )

app.use( express.static( uploadPath) )

app.post( '/uploadimg', upload.single( 'foto' ), (req, res, next ) => {
    console.log( 'nova imagem recebida' )

    if( !req.file )  {
        res.json( { msg: 'No File uploaded'} )
        return 
    }
        
    res.json( {
        msg:'Imagem recebia',
        error:false
    })
})

//retorna o norme dos arquivos disponiveis 
app.use( '/galeriaNames', ( req, res ) => {

    const fileNames = fs.readdirSync( uploadPath )
    if ( fileNames && fileNames[0] ) {                  // se tem arquivos na pasta 
        res.json( {
            msg:'',
            fotos:fileNames
        })

    } else {
        res.json( { msg:'Nenhuma Foto foi submetida' } )
    }
})

app.use( '/galeria' , (req, res) => {

    const fileNames = fs.readdirSync( uploadPath )
    if ( fileNames && fileNames[0] ) {                  // se tem arquivos na pasta 
        res.sendFile( `${uploadPath}/${fileNames[0]}`)
    }
})

app.use( '/', (req, res) => {
    res.sendFile (path.resolve( './dist/index.html' ))
})




app.listen( port, () => {
    console.log( ` Escutando no porto ${port}`)
})