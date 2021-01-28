echo "Current Branch:"
echo $(git branch)
read -p "[ENTER TO CONTINUE OR CTRL-C]" temp
echo ">Git Adding All"
git add --all
echo ">Git Commmiting..."
git commit -m "Quick Push"
echo ">Git Pushing!"
read -p "[ENTER TO CONTINUE OR CTRL-C]" temp
git push
echo ">DONE!"



