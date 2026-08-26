#include <iostream>
#include <filesystem>
#include <vector>
#include <string>

using namespace std;
using namespace std::filesystem;


int main()
{
    //colocar o caminho da pasta qual vai ter os arquivos
    string folderPath = "";

    vector<string> schemeList;
    vector<string> registerList;
    
    //subpastas  encontradas na pasta que está os schemas(que vai ser a pasta dos registers)
    vector<string> registerSubFolder;

    if (!exists(folderPath))
    {
        cout << "Diretorio não existe!"<< endl ;
        return 1;
    }

    for (const auto& entry:directory_iterator(folderPath))
    {
        //se o arquivo não é past/diretório
        if (entry.is_regular_file())
        {
         schemeList.push_back(entry.path().stem().string()); 
        }

        //pegar os arquivos de registers
        else if (entry.is_directory())
        {
            
            for (const auto& register:directory_iterator(entry.path()))
            {
                if (exists(register) && register.is_regular_file())
                {
                registerList.push_back(register.path().stem().string());
                }
            }

        }
    }
    
    //-------------------------------------------------------------------------
    //                  Comparar informações                                   
    //-------------------------------------------------------------------------
    
    for (string schemeList:s)
    {
        for (string registerList: r)
        {
        if (trim.(s) == trim(r))
        }
    }



}