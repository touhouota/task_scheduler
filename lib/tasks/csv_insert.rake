namespace :csv_insert do
  desc 'CSVからファイルからデータをインポート'
  task import_task: :environment do
    load File.join(Rails.root, 'db', 'graduation_ations', 'task_inserter.rb')
    main
  end
end
