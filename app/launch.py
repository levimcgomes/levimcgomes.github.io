import os
from pathlib import Path
import shutil

ROOT=Path("../../")
appBuild=ROOT.joinpath(Path("leviathancs.github.io/app/out"))
deployRepo=ROOT.joinpath(Path("levi-gomes.github.io"))

for item in deployRepo.iterdir():
	if not item.name == ".git":
		if item.is_dir():
			shutil.rmtree(item)
		else:
			item.unlink()

shutil.copytree(appBuild, deployRepo, dirs_exist_ok=True)

#for item in appBuild.iterdir():
#	if not item.name == ".git":
#		print(item.name + ": ", item.is_dir())
#		if item.is_dir():
#			shutil.copytree(item, deployRepo)
#		else:
#			shutil.copy(item, deployRepo)