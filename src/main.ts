import { config } from 'dotenv'; config();
import { Config, Rekognition } from 'aws-sdk';

async function run () {
  const config = new Config( {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  } )

  const client = new Rekognition();

  const params = {
    SourceImage: {
      S3Object: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Name: process.env.AWS_PHOTO1
      },
    },

    TargetImage: {
      S3Object: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Name: process.env.AWS_PHOTO2
      },
    },
    SimilarityThreshold: 70
  }

  console.log( '\nAnalisando...' );
  client.compareFaces( params, ( err, response ) => {
    if ( err ) {
      console.log( err, err.stack );
    } else {
      response.FaceMatches.forEach( data => {
        let precisao = data.Similarity
        console.log( 'Análise concluída.' )
        console.log( `Probabilidade de ser a mesma pessoa nas duas fotos: ${precisao.toFixed( 2 )} %\n` );
      } )
    }
  } );



}

run();
