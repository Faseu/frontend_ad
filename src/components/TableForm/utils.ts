import { OptionValue } from '@/components/TableForm/index';

export const getInitialValues = (options: OptionValue[]) => {
  const opts = {};
  options.forEach((opt) => {
    let { initialValue } = opt;
    if (opt.type === 'select' && !opt.initialValue && opt.selectList && opt.selectList.length > 0) {
      initialValue = opt.selectList[0].value;
    }
    opts[opt.key] = initialValue;
  });
  return opts;
};
