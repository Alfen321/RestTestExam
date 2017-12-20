import repoArray from './mockJson';
class ReposFacade {

    constructor() {
        this.repos = repoArray;
        /* const url = 'https://api.github.com/orgs/Cphdat3sem2017f/repos';
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.repos = json;
            })
            .catch((res) => {
                console.log(res)
                alert('error');
            }) */
    }

    getAll() {
        return this.repos;
    }

    getRpositoryFromName(name) {
        return this.repos.filter(repo => repo.name === name);
    }

}

let ReposData = new ReposFacade();

export default ReposData;
