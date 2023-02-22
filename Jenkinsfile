pipeline
{
    parameters {
        choice(name: 'environment', choices: ['dev','qa','uat'], description: 'SELECT ENV')
    }

    agent any
    options
    {
        buildDiscarder(logRotator(numToKeepStr: "10"))
    }
    environment {
        ENVIRONMENT='dev'
        Distribution_Id='E3BNJX2NS606V1'
    }
    stages
   
    {
		stage('deploy')
        {
            when{
                expression {env.GIT_BRANCH == "origin/develop" || params.ENVIRONMENT == 'dev'}
            }

        steps
         {
            sh 'node -v'
            sh 'yarn --version'
            sh 'yarn'
            sh 'yarn build'
            sh 'ls'
            sh 'aws --version'
            sh 'aws s3 sync build/ s3://non-prod-connect-dev'
            sh 'aws cloudfront create-invalidation --distribution-id ${Distribution_Id} --paths "/*"'
         }
        }
    }
}

