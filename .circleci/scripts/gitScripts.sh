#!/bin/bash
gitChanged(){
    LATEST_COMMIT=$(git rev-parse HEAD)
    FOLDER_COMMIT=$(git log -1 --format=format:%H --full-diff $1 )
    if [[ $FOLDER_COMMIT = $LATEST_COMMIT ]];
        then
            echo "files in $1 has changed"
            return 1
        else       
            echo "folder $1 did no changed"
        return 0
    fi
}

gitPackageLockChanged(){    
    echo "gitPackageLockChanged"
    pwd
    changed=$( git status -s | grep package-lock.json | wc -l )
    if [ $? -ne 0 ];
        then
        echo "Failed to get to know if package-lock had changed"
        return 1
    fi
    if [ $changed -ne 0 ];
        then
            echo "package-lock.json modified"
            return 0
        else       
            return 1
    fi
}

gitCommitPush_package-lock(){ 
    echo "gitCommitPush_package" 
    pwd  
    git add frontend/emi/package-lock.json
    git commit -m 'CircleCI has updated locked npm versions [ci skip]' frontend/emi/package-lock.json 
    git push    
}